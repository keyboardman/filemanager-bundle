<?php

declare(strict_types=1);

namespace Keyboardman\FilemanagerBundle\Tests\Form;

use Keyboardman\FilemanagerBundle\Form\FilemanagerPickerType;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class FilemanagerPickerTypeTest extends TestCase
{
    public function testBlockPrefixIsFilemanagerPicker(): void
    {
        $type = new FilemanagerPickerType();
        self::assertSame('filemanager_picker', $type->getBlockPrefix());
    }

    public function testParentIsTextType(): void
    {
        $type = new FilemanagerPickerType();
        self::assertSame(TextType::class, $type->getParent());
    }

    public function testDefaultOptions(): void
    {
        $type = new FilemanagerPickerType();
        $resolver = new OptionsResolver();
        $type->configureOptions($resolver);
        $options = $resolver->resolve();
        self::assertSame('/filemanager', $options['picker_url']);
        self::assertSame('Parcourir…', $options['button_label']);
    }
}
