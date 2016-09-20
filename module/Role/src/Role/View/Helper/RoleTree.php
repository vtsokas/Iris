<?

namespace Role\View\Helper;

use Role\Service\RoleService;
use Zend\View\Helper\AbstractHelper;

class RoleTree extends AbstractHelper{

    protected $roleService;

    public function __invoke(){
        $roles = $this->roleService->getRoles();

        /**
         * @todo Make this work dynamically for any tree depth
         */
        if($this->view->isAllowed($roles->children[0]->role)){
            $children = $roles->children;
        } else {
            $children = $roles->children[0]->children;
        }

        $html = "<div id='jqxTree' style='visibility: hidden; float: left;'>";
        $html .= "<ul>";

        foreach ($children as $child){
            if ($this->view->isAllowed($child->role)){
                $html .= $this->addElement($child, $html);
            }
        }
        $html .= "</ul>";
        $html .= "</div>";

        return $html;
    }

    protected function addElement($child, $html){
        $checked = ($this->roleService->getUserRole() == $child->role) ? "true" : "false";
        $open    = $checked;

        $html = "<li item-checked='" . $checked . "' item-expanded='" . $open . "'>" . $child->role;

        if (property_exists($child, "children") && sizeof($child->children) > 0){
            $html .= "<ul>";
            foreach ($child->children as $gchild){
                $html .= $this->addElement($gchild, $html);
            }
            $html .= "</ul>";
        }

        $html .= "</li>";

        return $html;
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