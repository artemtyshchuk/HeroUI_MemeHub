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
  const [memeLikes, setMemeLikes] = useState<string>(likes);

  const [titleError, setTitleError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [likesError, setLikesError] = useState<string>("");

  const mutation = useUpdateMeme(id, () => onOpenChange(false));

  const handleTitleChange = (value: string) => {
    setMemeTitle(value);
    if (value.length < 3 || value.length > 100) {
      setTitleError("Title must be between 3 and 100 characters");
    } else {
      setTitleError("");
    }
  };

  const handleImageChange = (value: string) => {
    setMemeImageUrl(value);

    try {
      new URL(value);
      const isJpg = /\.(jpg|jpeg)$/i.test(value);
      if (!isJpg) {
        setImageError("Image must be a valid JPG file");
      } else {
        setImageError("");
      }
    } catch {
      setImageError("Invalid image URL");
    }
  };

  const handleLikesChange = (value: string) => {
    const num = Number(value);
    setMemeLikes(value);

    if (value === "") {
      setLikesError("Number of likes is required");
    } else if (
      !Number.isNaN(num) &&
      Number.isInteger(num) &&
      num >= 0 &&
      num <= 99
    ) {
      setLikesError("");
    } else {
      setLikesError("An integer from 0 to 99");
    }
  };

  const handleSave = () => {
    if (titleError || imageError || likesError) return;

    mutation.mutate({
      title: memeTitle,
      image: memeImageUrl,
      likes: memeLikes,
    });
  };

  return (
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
                errorMessage={titleError}
                isInvalid={!!titleError}
                label="Title"
                labelPlacement="outside"
                placeholder="Change Title"
                type="text"
                value={memeTitle}
                onValueChange={handleTitleChange}
                variant="bordered"
              />
              <Input
                isRequired
                errorMessage={imageError}
                isInvalid={!!imageError}
                label="Image"
                labelPlacement="outside"
                placeholder="Change image. Enter a valid JPG image URL"
                type="text"
                value={memeImageUrl}
                onValueChange={handleImageChange}
                variant="bordered"
              />
              <Input
                isRequired
                errorMessage={likesError}
                isInvalid={!!likesError}
                label="Likes"
                labelPlacement="outside"
                placeholder="Change Likes"
                type="number"
                value={memeLikes}
                onValueChange={handleLikesChange}
                variant="bordered"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => onOpenChange(false)}>Cancel</Button>
            <Button
              isLoading={mutation.isPending}
              color="primary"
              onPress={handleSave}
              isDisabled={!!titleError || !!imageError || !!likesError}
            >
              Confirm
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
