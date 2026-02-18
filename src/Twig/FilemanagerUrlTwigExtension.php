<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Twig;

use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

final class FilemanagerUrlTwigExtension extends AbstractExtension
{
    public function __construct(
        private readonly FilemanagerUrlResolver $resolver,
    ) {
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('filemanager_url', [$this->resolver, 'resolve']),
        ];
    }
}
