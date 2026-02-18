<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Tests\Service;

use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class FilemanagerUrlResolverTest extends TestCase
{
    public function testParseReturnsFilesystemAndPath(): void
    {
        $urlGenerator = $this->createMock(UrlGeneratorInterface::class);
        $resolver = new FilemanagerUrlResolver('app_serve', $urlGenerator);

        self::assertSame(['default', 'folder/file.jpg'], $resolver->parse('folder/file.jpg'));
        self::assertSame(['s3', 'uploads/photo.jpg'], $resolver->parse('s3:uploads/photo.jpg'));
        self::assertSame(['fs', 'path/with:colon.jpg'], $resolver->parse('fs:path/with:colon.jpg'));
    }

    public function testResolveGeneratesUrlWhenRouteConfigured(): void
    {
        $urlGenerator = $this->createMock(UrlGeneratorInterface::class);
        $urlGenerator->expects(self::once())
            ->method('generate')
            ->with('app_serve', ['filesystem' => 's3', 'path' => 'uploads/photo.jpg'], UrlGeneratorInterface::ABSOLUTE_URL)
            ->willReturn('https://example.com/serve/s3/uploads/photo.jpg');

        $resolver = new FilemanagerUrlResolver('app_serve', $urlGenerator);
        self::assertSame('https://example.com/serve/s3/uploads/photo.jpg', $resolver->resolve('s3:uploads/photo.jpg'));
    }

    public function testResolveTreatsValueWithoutColonAsDefault(): void
    {
        $urlGenerator = $this->createMock(UrlGeneratorInterface::class);
        $urlGenerator->expects(self::once())
            ->method('generate')
            ->with('app_serve', ['filesystem' => 'default', 'path' => 'old/value.jpg'], UrlGeneratorInterface::ABSOLUTE_URL)
            ->willReturn('https://example.com/serve/default/old/value.jpg');

        $resolver = new FilemanagerUrlResolver('app_serve', $urlGenerator);
        self::assertSame('https://example.com/serve/default/old/value.jpg', $resolver->resolve('old/value.jpg'));
    }

    public function testResolveReturnsEmptyStringWhenRouteNotConfigured(): void
    {
        $urlGenerator = $this->createMock(UrlGeneratorInterface::class);
        $urlGenerator->expects(self::never())->method('generate');

        $resolver = new FilemanagerUrlResolver(null, $urlGenerator);
        self::assertSame('', $resolver->resolve('s3:uploads/photo.jpg'));
    }

    public function testIsConfigured(): void
    {
        $urlGenerator = $this->createMock(UrlGeneratorInterface::class);
        self::assertTrue((new FilemanagerUrlResolver('app_serve', $urlGenerator))->isConfigured());
        self::assertFalse((new FilemanagerUrlResolver(null, $urlGenerator))->isConfigured());
        self::assertFalse((new FilemanagerUrlResolver('', $urlGenerator))->isConfigured());
    }
}
