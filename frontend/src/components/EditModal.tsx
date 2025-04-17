import { useState } from "react";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { Meme } from "@/types";
import { useUpdateMeme } from "@/hooks/useUpdateMeme";

interface EditModalProps extends Meme {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const EditModal = ({
  id,
  image,
  likes,
  title,
  onOpenChange,
  isOpen,
}: EditModalProps) => {
  const [memeTitle, setMemeTitle] = useState<string>(title);
  const [memeImageUrl, setMemeImageUrl] = useState<string>(image);
  const [imageError, setImageError] = useState<string>("");
  const [memeLikes, setMemeLikes] = useState<string>(likes);

  const mutation = useUpdateMeme(id, () => onOpenChange(false));

  const handleImageChange = (value: string) => {
    setMemeImageUrl(value);

    const isValid = /\.(jpg|jpeg)$/i.test(value);

    if (!isValid) {
      setImageError("Image must be in JPG format");
    } else {
      setImageError("");
    }
  };

  const handleLikesChange = (value: string) => {
    if (value.length <= 2 || value === "") setMemeLikes(value);
  };

  const handleSave = () => {
    mutation.mutate({
      title: memeTitle,
      image: memeImageUrl,
      likes: memeLikes,
    });
  };

  return (
    <>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Meme with id: {id}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col md:flex-nowrap gap-4">
                <Input
                  isRequired
                  label="Title"
                  labelPlacement="outside"
                  placeholder="Change Title"
                  type="text"
                  value={memeTitle}
                  onValueChange={setMemeTitle}
                  variant="bordered"
                />
                <Input
                  isRequired
                  errorMessage={imageError}
                  isInvalid={!!imageError}
                  label="Image"
                  labelPlacement="outside"
                  placeholder="Change image. Enter a valid image URL"
                  type="text"
                  value={memeImageUrl}
                  variant="bordered"
                  onValueChange={handleImageChange}
                />
                <Input
                  isRequired
                  label="Likes"
                  labelPlacement="outside"
                  placeholder="Change Likes"
                  type="number"
                  value={memeLikes}
                  onValueChange={(value) => handleLikesChange(value)}
                  variant="bordered"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                aria-label={`Cancel Button`}
                onPress={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                aria-label={`Save Button`}
                isLoading={mutation.isPending}
                color="primary"
                onPress={handleSave}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
