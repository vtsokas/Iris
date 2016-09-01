<?

namespace Task\Model;

interface TaskRepositoryInterface
{
    /**
     * Return a set of all tasks that we can iterate over.
     *
     * Each entry should be a Task instance.
     *
     * @return Task[]
     */
    public function findAllTasks();

    /**
     * Return a single task.
     *
     * @param  int $id Identifier of the task to return.
     * @return Task
     */
    public function findTask($id);
}