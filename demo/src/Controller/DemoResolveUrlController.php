<?php

declare(strict_types=1);

namespace App\Controller;

use Aws\S3\S3Client;
use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Remplace le ResolveUrlController du bundle pour S3 :
 * - S3 : URL présignée (valide 1 h)
 * - default : URL via demo_serve_file
 */
final class DemoResolveUrlController
{
    private const PRESIGN_EXPIRES_IN = 3600;

    public function __construct(
        private readonly FilemanagerUrlResolver $resolver,
        private readonly S3Client $s3Client,
        private readonly string $minioBucket,
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $filesystem = $request->query->getString('filesystem');
        $path = $request->query->getString('path');

        if ($path === '') {
            return new JsonResponse(['url' => ''], 200);
        }

        $value = $filesystem !== '' ? $filesystem . ':' . $path : 'default:' . $path;

        if ($filesystem === 's3' && $this->minioBucket !== '') {
            $key = ltrim(str_replace('\\', '/', $path), '/');
            $cmd = $this->s3Client->getCommand('GetObject', [
                'Bucket' => $this->minioBucket,
                'Key' => $key,
            ]);
            $req = $this->s3Client->createPresignedRequest($cmd, '+' . self::PRESIGN_EXPIRES_IN . ' seconds');
            $url = (string) $req->getUri();
        } else {
            $url = $this->resolver->resolve($value);
        }

        return new JsonResponse(['url' => $url], 200);
    }
}
