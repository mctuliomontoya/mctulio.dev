import { useParams } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import { Item } from '@/app/components/Item'
import { List } from '@/app/components/List'

interface StoreProps {
  match: {
    params: {
      id: string;
    };
  };
}

function Store({ match }: StoreProps) {
  const { id } = match.params;
  const imageHasLoaded = true;

  return (
    <>
      <List selectedId={id} />
      <AnimatePresence>
        {id && imageHasLoaded && <Item id={id} key="item" />}
      </AnimatePresence>
    </>
  );
}

export function StoreWrapper() {
  const params = useParams();
  // @ts-expect-error: this is not typed.
  return <Store match={{ params }} />;
}