<?

namespace Role\Service;

use Zend\Authentication\AuthenticationService;

class RoleService
{
    protected $authService;
    protected $userRole;
    protected $roles;

    /**
     * Decides whether a given role is the connected
     * user's role or one of his child roles
     *
     * @param Sτring $role
     * @return boolean
     */
    public function isAllowed($resource)
    {
        return in_array($resource, $this->getRoleTree());
    }

    /**
     * Return a list of all the roles belonging to the currently
     * connected user and his children recursively
     *
     * @return array of Strings
     */
    public function getRoleTree($node = null, $write = false, $roles = array())
    {
        /**
         * If not called by itself start from the beginning
         */
        if (null == $node) $node = $this->roles;

        if (!property_exists($node, "children")) $node->children = [];

        /**
         * When we find the user role, we put it in our allow list
         * and activate the write flag. From this point, as we go deeper,
         * everything we see we add it in the list
         */
        if ($node->role == $this->userRole){
            $write = true;
            $roles[] = $node->role;
        }
        /**
         * Iterate through children, adding them in the list if the flag
         * is true. If we have added the parent, we add children blindly
         */
        foreach ($node->children as $childNode){
            if($write) $roles[] = $childNode->role;
            /**
             * Call self recursively no matter what.
             * @todo Need to improve this for projects with larger role trees
             */
            $roles = $this->getRoleTree($childNode, $write, $roles);
        }
        /**
         * After having collected all the allowed roles, return them
         */
        return $roles;
    }

    /**
     * Set roles.
     *
     * @param String $roles
     * @return \Application\Service\RoleService
     */
    public function setRoles($roles)
    {
        $this->roles = json_decode($roles);
    }

    /**
     * Get roles.
     *
     * @return String $roles
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * Get authService.
     *
     * @return AuthenticationService
     */
    public function getAuthService()
    {
        return $this->authService;
    }

    /**
     * Get userRole
     *
     * @return String userRole
     */
    public function getUserRole()
    {
        return $this->userRole;
    }


    /**
     * Set authService.
     *
     * @param AuthenticationService $authService
     * @return \Application\Service\RoleService
     */
    public function setAuthService(AuthenticationService $authService)
    {
        $this->authService = $authService;
        $this->userRole = $this->authService->getIdentity()->getRole();
        return $this;
    }
}