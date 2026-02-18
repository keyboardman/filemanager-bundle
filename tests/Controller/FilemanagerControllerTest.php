<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Tests\Controller;

use Keyboardman\FilemanagerBundle\Tests\Kernel;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;

final class FilemanagerControllerTest extends TestCase
{
    public function testFilemanagerPageReturns200AndContainsHeader(): void
    {
        $kernel = new Kernel('test', true);
        $kernel->boot();
        $request = Request::create('/filemanager', 'GET');
        $response = $kernel->handle($request, HttpKernelInterface::MAIN_REQUEST, false);

        self::assertSame(200, $response->getStatusCode());
        self::assertStringContainsString('File Manager', $response->getContent());
        self::assertStringContainsString('Chemin', $response->getContent());
        self::assertStringContainsString('data-api-base', $response->getContent());
        self::assertStringContainsString('filesystem', $response->getContent());
        self::assertStringContainsString('Filtre', $response->getContent());
        self::assertStringContainsString('Tri', $response->getContent());
    }
}
