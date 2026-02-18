<?php

declare(strict_types=1);

namespace App\Controller;

use Keyboardman\FilesystemBundle\Service\FileStorage;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sert le fichier depuis le filesystem configuré (url_route pour le form picker value_type = url).
 */
final class DemoServeFileController
{
    private const MIME_TYPES = [
        'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'gif' => 'image/gif',
        'webp' => 'image/webp', 'svg' => 'image/svg+xml', 'mp4' => 'video/mp4', 'webm' => 'video/webm',
        'mp3' => 'audio/mpeg', 'wav' => 'audio/wav', 'ogg' => 'audio/ogg', 'pdf' => 'application/pdf',
    ];

    public function __construct(
        private readonly FileStorage $fileStorage,
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
