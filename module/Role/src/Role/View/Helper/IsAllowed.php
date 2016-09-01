<?

namespace Role\View\Helper;

use Role\Service\RoleService;
use Zend\View\Helper\AbstractHelper;

class IsAllowed extends AbstractHelper{

    protected $roleService;

    public function __invoke($resource){
        return $this->roleService->isAllowed($resource);
    }

    /**
     * Set roleService.
     *
     * @param RoleService $authService
     */
    public function setRoleService(RoleService $service){
        $this->roleService = $service;
    }
}