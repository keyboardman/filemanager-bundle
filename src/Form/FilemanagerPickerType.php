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
        ]);
        $resolver->setAllowedTypes('picker_url', 'string');
        $resolver->setAllowedTypes('button_label', 'string');
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['picker_url'] = $options['picker_url'];
        $view->vars['button_label'] = $options['button_label'];
    }
}
