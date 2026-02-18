<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Service;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Resolves a "filesystem:path" value to an absolute URL.
 * Strategy is configurable (e.g. route name with filesystem and path params).
 */
final class FilemanagerUrlResolver
{
    public function __construct(
        private readonly ?string $urlRoute,
        private readonly UrlGeneratorInterface $urlGenerator,
        private readonly int $urlReferenceType = UrlGeneratorInterface::ABSOLUTE_URL,
    ) {
    }

    /**
     * Resolves "filesystem:path" to an absolute URL.
     * If value contains no ":", it is treated as "default:value" for backward compatibility.
     */
    public function resolve(string $filesystemPath): string
    {
        if ($this->urlRoute === null || $this->urlRoute === '') {
            return '';
        }

        [$filesystem, $path] = $this->parse($filesystemPath);

        return $this->urlGenerator->generate($this->urlRoute, [
            'filesystem' => $filesystem,
            'path' => $path,
        ], $this->urlReferenceType);
    }

    /**
     * Parses "filesystem:path" into [filesystem, path].
     * Value without ":" is treated as path with filesystem "default".
     */
    public function parse(string $value): array
    {
        $colon = strpos($value, ':');
        if ($colon === false) {
            return ['default', $value];
        }

        return [
            substr($value, 0, $colon),
            substr($value, $colon + 1),
        ];
    }

    public function isConfigured(): bool
    {
        return $this->urlRoute !== null && $this->urlRoute !== '';
    }
}
