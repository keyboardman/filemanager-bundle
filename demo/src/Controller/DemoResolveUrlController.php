<?php

declare(strict_types=1);

namespace App\Controller;

use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Remplace le ResolveUrlController du bundle.
 * Retourne toujours l’URL absolue de l’app (demo_serve_file). Pour S3, cette URL
 * redirige vers le vrai lien S3 ; pour default, le fichier est streamé.
 */
final class DemoResolveUrlController
{
    public function __construct(
        private readonly FilemanagerUrlResolver $resolver,
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
        $url = $this->resolver->resolve($value);

        return new JsonResponse(['url' => $url], 200);
    }
}
