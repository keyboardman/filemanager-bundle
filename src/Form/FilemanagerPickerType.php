<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class FilemanagerPickerType extends AbstractType
{
    public function getParent(): string
    {
        return TextType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'filemanager_picker';
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'picker_url' => '/filemanager',
            'button_label' => 'Parcourir…',
            'value_type' => 'path',
            'resolve_url_route' => 'keyboardman_filemanager_resolve_url',
        ]);
        $resolver->setAllowedTypes('picker_url', 'string');
        $resolver->setAllowedTypes('button_label', 'string');
        $resolver->setAllowedValues('value_type', ['path', 'url']);
        $resolver->setAllowedTypes('resolve_url_route', 'string');
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['picker_url'] = $options['picker_url'];
        $view->vars['button_label'] = $options['button_label'];
        $view->vars['value_type'] = $options['value_type'];
        $view->vars['resolve_url_route'] = $options['resolve_url_route'];
    }
}
