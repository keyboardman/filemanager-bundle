<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

final class KeyboardmanFilemanagerExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        $config = $this->processConfiguration(new Configuration(), $configs);
        $container->setParameter('keyboardman_filemanager.url_route', $config['url_route'] ?? null);
        $filesystems = $config['available_filesystems'] ?? ['default', 's3'];
        $container->setParameter('keyboardman_filemanager.available_filesystems', array_values(array_unique($filesystems, SORT_REGULAR)));
        $s3Filesystems = $config['s3_filesystems'] ?? [];
        $container->setParameter('keyboardman_filemanager.s3_filesystems', array_values(array_unique($s3Filesystems, SORT_REGULAR)));

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yaml');
    }
}
