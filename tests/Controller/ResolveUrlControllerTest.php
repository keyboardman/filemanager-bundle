<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Tests\Controller;

use Keyboardman\FilemanagerBundle\Tests\Kernel;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;

final class ResolveUrlControllerTest extends TestCase
{
    public function testResolveUrlReturnsJsonWithUrlKey(): void
    {
        $kernel = new Kernel('test', true);
        $kernel->boot();
        $request = Request::create('/filemanager/resolve-url?filesystem=default&path=uploads/photo.jpg', 'GET');
        $response = $kernel->handle($request, HttpKernelInterface::MAIN_REQUEST, false);

        self::assertSame(200, $response->getStatusCode());
        self::assertSame('application/json', $response->headers->get('Content-Type'));
        $data = json_decode($response->getContent(), true);
        self::assertArrayHasKey('url', $data);
    }

    public function testResolveUrlWithEmptyPathReturnsEmptyUrl(): void
    {
        $kernel = new Kernel('test', true);
        $kernel->boot();
        $request = Request::create('/filemanager/resolve-url?filesystem=default&path=', 'GET');
        $response = $kernel->handle($request, HttpKernelInterface::MAIN_REQUEST, false);

        self::assertSame(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        self::assertSame('', $data['url']);
    }
}
