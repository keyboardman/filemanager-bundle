<?php

declare(strict_types=1);

namespace App\Controller;

use Aws\S3\S3Client;
use Keyboardman\FilemanagerBundle\Service\S3FilesystemDetector;
use Keyboardman\FilesystemBundle\Service\FileStorage;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sert le fichier depuis le filesystem configuré (url_route pour le form picker value_type = url).
 * Pour S3 : redirige vers une URL pré-signée (accès autorisé sans rendre le bucket public). Pour default : stream du fichier.
 */
final class DemoServeFileController
{
    private const MIME_TYPES = [
        'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'gif' => 'image/gif',
        'webp' => 'image/webp', 'svg' => 'image/svg+xml', 'mp4' => 'video/mp4', 'webm' => 'video/webm',
        'mp3' => 'audio/mpeg', 'wav' => 'audio/wav', 'ogg' => 'audio/ogg', 'pdf' => 'application/pdf',
    ];

    private const PRESIGN_EXPIRES_IN = 3600; // 1 heure

    public function __construct(
        private readonly FileStorage $fileStorage,
        private readonly S3FilesystemDetector $s3Detector,
        private readonly S3Client $s3Client,
        private readonly string $minioBucket,
    ) {
    }

    public function __invoke(Request $request, string $filesystem, string $path): Response
    {
        $path = trim($path, '/');
        if ($path === '' || str_contains($path, '..')) {
            return new Response('Invalid path', 400);
        }

        if (!$this->fileStorage->hasFilesystem($filesystem)) {
            return new Response('Unknown filesystem', 404);
        }

        if ($this->s3Detector->isS3($filesystem) && $this->minioBucket !== '') {
            if (!$this->fileStorage->has($filesystem, $path)) {
                return new Response('Not found', 404);
            }
            $key = ltrim(str_replace('\\', '/', $path), '/');
            $cmd = $this->s3Client->getCommand('GetObject', [
                'Bucket' => $this->minioBucket,
                'Key' => $key,
            ]);
            $presignedRequest = $this->s3Client->createPresignedRequest($cmd, '+' . self::PRESIGN_EXPIRES_IN . ' seconds');
            $presignedUrl = (string) $presignedRequest->getUri();

            return new RedirectResponse($presignedUrl, 302);
        }

        if (!$this->fileStorage->has($filesystem, $path)) {
            return new Response('Not found', 404);
        }

        try {
            $content = $this->fileStorage->read($filesystem, $path);
        } catch (\Throwable) {
            return new Response('Cannot serve (e.g. directory)', 400);
        }
        $ext = strtolower(pathinfo($path, \PATHINFO_EXTENSION));
        $mimeType = self::MIME_TYPES[$ext] ?? 'application/octet-stream';
        $filename = basename($path);

        return new Response($content, 200, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'inline; filename="' . addslashes($filename) . '"',
        ]);
    }
}
