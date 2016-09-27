<?

namespace Message\Model;

interface MessageRepositoryInterface
{
    /**
     * Return a set of all Messages that we can iterate over.
     *
     * Each entry should be a Message instance.
     *
     * @return Message[]
     */
    public function findAllMessages();

    /**
     * Return a single Message.
     *
     * @param  int $id Identifier of the Message to return.
     * @return Message
     */
    public function findMessage($id);
}