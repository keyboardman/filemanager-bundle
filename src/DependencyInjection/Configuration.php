<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

final class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('keyboardman_filemanager', 'array');
        /** @var ArrayNodeDefinition $root */
        $root = $treeBuilder->getRootNode();
        $root->children()
            ->scalarNode('url_route')->defaultNull()->info('Route name to generate file URL (params: filesystem, path). If null, URL resolution is disabled.')->end()
            ->arrayNode('available_filesystems')
                ->info('List of filesystem names to show in the UI dropdown. Only configured filesystems should be listed to avoid "Unknown filesystem" API errors.')
                ->defaultValue(['default', 's3'])
                ->scalarPrototype()->end()
            ->end()
            ->end();

        return $treeBuilder;
    }
}
