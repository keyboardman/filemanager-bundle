<?php

declare(strict_types=1);

namespace App\Controller;

use Keyboardman\FilemanagerBundle\Form\FilemanagerPickerType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

final class DemoPickerController
{
    public function __construct(
        private readonly FormFactoryInterface $formFactory,
        private readonly Environment $twig,
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $form = $this->formFactory->createBuilder()
            ->add('file1', FilemanagerPickerType::class, ['label' => 'Fichier 1'])
            ->add('file2', FilemanagerPickerType::class, ['label' => 'Fichier 2'])
            ->getForm();

        $form->handleRequest($request);
        $submitted = $form->isSubmitted() && $form->isValid() ? $form->getData() : null;

        return new Response($this->twig->render('demo_picker.html.twig', [
            'form' => $form->createView(),
            'submitted' => $submitted,
        ]));
    }
}
