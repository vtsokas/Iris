<?php

namespace Role\Model;

class User extends \ZfcUser\Entity\User
{
    /**
     * @var string
     */
    protected $role = "user";

    /**
     * Get role.
     *
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * Set role.
     *
     * @param string $role
     * @return UserInterface
     */
    public function setRole($role)
    {
        $this->role = $role;
        return $this;
    }

}
