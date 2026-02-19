<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Service;

/**
 * Détecte si un filesystem est déclaré comme S3 (ou compatible) via la configuration.
 * Ne dépend pas du SDK AWS ; l'application configure la liste des noms (ex. ['s3']).
 */
final class S3FilesystemDetector
{
    /** @param list<string> $s3FilesystemNames */
    public function __construct(
        private readonly array $s3FilesystemNames = [],
    ) {
    }

    public function isS3(string $filesystemName): bool
    {
        return \in_array($filesystemName, $this->s3FilesystemNames, true);
    }
}
