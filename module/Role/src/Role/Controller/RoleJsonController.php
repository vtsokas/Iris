<?

namespace Role\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class RoleJsonController extends AbstractRestfulController
{
    protected $repository;

    /**
     * Return list of resources
     *
     * @return mixed
     */
    public function getList()
    {
        return new JsonModel(array(
            "childRoles" => $this->getRepository()->getRoleTree(),
            "userRole"   => $this->getRepository()->getUserRole()
        ));
    }

    public function create($data){}

    public function update($id, $data){}

    public function delete($id){}

    public function getRepository(){
        if (null == $this->repository)
        {
            $this->repository = $this->getServiceLocator()->get("role_service");
        }

        return $this->repository;
    }
}