<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Controller;

use Keyboardman\FilemanagerBundle\DTO\FilemanagerQueryDto;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

final class FilemanagerController
{
    /** @param list<string> $availableFilesystems */
    public function __construct(
        private readonly Environment $twig,
        private readonly array $availableFilesystems = ['default', 's3'],
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $dto = FilemanagerQueryDto::fromRequest($request);
        $initialFilesystem = $dto->filesystem ?? 'default';
        if (!\in_array($initialFilesystem, $this->availableFilesystems, true)) {
            $initialFilesystem = $this->availableFilesystems[0] ?? 'default';
        }

        return new Response($this->twig->render('@KeyboardmanFilemanager/manager.html.twig', [
            'api_base' => '/api/filesystem',
            'initial_path' => $dto->path ?? '',
            'initial_filter_type' => $dto->getFilterType() ?? '',
            'initial_filter_search' => $dto->filterSearch ?? '',
            'initial_sort' => $dto->getSortForApi() ?? 'asc',
            'initial_filesystem' => $initialFilesystem,
            'available_filesystems' => $this->availableFilesystems,
            'picker' => $dto->picker,
            'channel' => $dto->channel ?? '',
        ]));
    }
}
