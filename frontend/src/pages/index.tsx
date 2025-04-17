import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useDisclosure } from "@heroui/modal";

import DefaultLayout from "@/layouts/default";
import { useFetchMemes } from "@/hooks/useFetchMemes";
import { Meme } from "@/types";
import { EditModal } from "@/components/EditModal";

export default function IndexPage() {
  const { data: memes, isLoading, isError, error } = useFetchMemes();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    throw new Error(
      typeof error === "string" ? error : "An unknown error occurred"
    );

  const handleEditClick = (meme: Meme) => {
    setSelectedMeme(meme);
    onOpen();
  };

  return (
    <DefaultLayout>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px] w-full text-center">
          <TableHeader>
            <TableColumn className="text-center">Id</TableColumn>
            <TableColumn className="text-center">Title</TableColumn>
            <TableColumn className="text-center">Image</TableColumn>
            <TableColumn className="text-center">Likes</TableColumn>
            <TableColumn className="text-center">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {memes!.map((meme: Meme) => (
              <TableRow key={meme.id}>
                <TableCell className="text-center">{meme.id}</TableCell>
                <TableCell className="text-center">{meme.title}</TableCell>
                <TableCell className="text-center">
                  <a
                    href={meme.image}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {meme.image}
                  </a>
                </TableCell>
                <TableCell className="text-center">{meme.likes}</TableCell>
                <TableCell>
                  <Button
                    aria-label={`Edit meme with title: ${meme.title}`}
                    className="flex justify-self-center"
                    color="primary"
                    variant="ghost"
                    onPress={() => handleEditClick(meme)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isOpen && selectedMeme && (
        <EditModal
          key={selectedMeme.id}
          id={selectedMeme.id}
          image={selectedMeme.image}
          isOpen={isOpen}
          likes={selectedMeme.likes}
          title={selectedMeme.title}
          onOpenChange={onOpenChange}
        />
      )}
    </DefaultLayout>
  );
}
