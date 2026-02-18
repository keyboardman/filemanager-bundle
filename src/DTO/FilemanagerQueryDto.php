<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\DTO;

use Symfony\Component\HttpFoundation\Request;

final class FilemanagerQueryDto
{
    public function __construct(
        public readonly ?string $path = null,
        public readonly ?string $filterType = null,
        public readonly ?string $filterSearch = null,
        public readonly ?string $sort = null,
        public readonly bool $picker = false,
        public readonly ?string $channel = null,
        public readonly ?string $filesystem = null,
    ) {
    }

    public static function fromRequest(Request $request): self
    {
        // Symfony 6+ : InputBag::get() rejette les valeurs non scalaires ; filter est un tableau
        $query = $request->query->all();
        $filter = $query['filter'] ?? [];
        $filter = is_array($filter) ? $filter : [];

        return new self(
            path: $request->query->get('path'),
            filterType: $filter['type'] ?? null,
            filterSearch: $filter['search'] ?? null,
            sort: $request->query->get('sort'),
            picker: $request->query->get('picker') === '1',
            channel: $request->query->get('channel'),
            filesystem: $request->query->get('filesystem'),
        );
    }

    /**
     * @return 'audio'|'image'|'video'|null
     */
    public function getFilterType(): ?string
    {
        if (!in_array($this->filterType, ['audio', 'image', 'video'], true)) {
            return null;
        }

        return $this->filterType;
    }

    /**
     * @return 'name_asc'|'name_desc'|null
     */
    public function getSort(): ?string
    {
        // Accepte les formats 'name_asc'/'name_desc' ou 'asc'/'desc'
        if (in_array($this->sort, ['name_asc', 'name_desc'], true)) {
            return $this->sort;
        }
        
        if ($this->sort === 'asc') {
            return 'name_asc';
        }
        
        if ($this->sort === 'desc') {
            return 'name_desc';
        }

        return null;
    }

    /**
     * Convertit le sort en format attendu par l'API (asc/desc)
     */
    public function getSortForApi(): ?string
    {
        return match ($this->getSort()) {
            'name_asc' => 'asc',
            'name_desc' => 'desc',
            default => null,
        };
    }
}
