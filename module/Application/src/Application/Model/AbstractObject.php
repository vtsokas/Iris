<?php

namespace Application\Model;

class AbstractObject extends \stdClass{

    private $id = 0;

    public function exchangeArray($data){
        foreach ($data as $key => $value){
            $this->{$key} = $value;
        }
    }

    public function toArray(){
        return get_object_vars($this);
    }

    public function getId(){
        return $this->id;
    }

    public function setId($id){
        $this->id = $id;
        return $this;
    }
}