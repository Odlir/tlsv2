<?php

namespace App\Traits;

trait MyTrait
{
    public function eliminarAcentos($cadena)
    {
        $originales = ['Á','À','Â','Ä','á','à','ä','â','ª',
            'É','È','Ê','Ë','é','è','ë','ê',
            'Í','Ì','Ï','Î','í','ì','ï','î',
            'Ó','Ò','Ö','Ô','ó','ò','ö','ô',
            'Ú','Ù','Û','Ü','ú','ù','ü','û',
            'Ñ','ñ','Ç','ç'];
        $reemplazos = ['A','A','A','A','a','a','a','a','a',
            'E','E','E','E','e','e','e','e',
            'I','I','I','I','i','i','i','i',
            'O','O','O','O','o','o','o','o',
            'U','U','U','U','u','u','u','u',
            'N','n','C','c'];

        return str_replace($originales, $reemplazos, $cadena);
    }

    public function setUpperCase($field, $value)
    {
        return strtoupper($value);
    }

    public function setCapitalize($field, $value)
    {
        return ucwords(strtolower($value));
    }

    public function setCapitalizeFirst($field, $value)
    {
        return ucfirst(strtolower($value));
    }

    public function sinTilde($field, $value)
    {
        return $this->eliminarAcentos($value);
    }
}
