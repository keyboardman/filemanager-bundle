<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Controller;

use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

final class ResolveUrlController
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
