<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Controller;

use Keyboardman\FilemanagerBundle\DTO\FilemanagerQueryDto;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

final class FilemanagerController
{
    public function __construct(
        private readonly Environment $twig,
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $dto = FilemanagerQueryDto::fromRequest($request);

        return new Response($this->twig->render('@KeyboardmanFilemanager/manager.html.twig', [
            'api_base' => '/api/filesystem',
            'initial_path' => $dto->path ?? '',
            'initial_filter_type' => $dto->getFilterType() ?? '',
            'initial_filter_search' => $dto->filterSearch ?? '',
            'initial_sort' => $dto->getSortForApi() ?? 'asc',
            'picker' => $dto->picker,
            'channel' => $dto->channel ?? '',
        ]));
    }
}
