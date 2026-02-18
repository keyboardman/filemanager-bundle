<?php

declare(strict_types=1);

namespace App;

use Keyboardman\FilemanagerBundle\KeyboardmanFilemanagerBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Bundle\TwigBundle\TwigBundle;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class Kernel extends BaseKernel
{
    use MicroKernelTrait;

    public function registerBundles(): array
    {
        $filesystemBundle = 'Keyboardman\\FilesystemBundle\\KeyboardmanFilesystemBundle';

        return [
            new FrameworkBundle(),
            new TwigBundle(),
            new $filesystemBundle(),
            new KeyboardmanFilemanagerBundle(),
        ];
    }

    protected function configureContainer(ContainerConfigurator $container): void
    {
        $container->import($this->getConfigDir() . '/services.yaml');
        $container->import($this->getConfigDir() . '/packages/*.yaml');
    }

    protected function configureRoutes(RoutingConfigurator $routes): void
    {
        $routes->import($this->getConfigDir() . '/routes.yaml');
    }
}
