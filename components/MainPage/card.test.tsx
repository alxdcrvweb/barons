import { render, screen } from "@testing-library/react";
import { useInjection } from "inversify-react";
import { CardStore } from "../../stores/CardStore";
import { getRightImage } from "../Craft/handlers";
import Card from "./card";

test("renders without crashing", async() => {
  const cardStore = useInjection(CardStore);
  render(
    <>
      {cardStore.unstakedTokensList.map((card, i) => {
        return <Card card={card} isStaked={false} craftedLink={
            card.name && card.quality
              ? getRightImage(card.name, card.quality, card.wearOut)
              : undefined
          } index={i} />;
      })}
    </>
  );
  const img = await screen.findByAltText("NFT")
  // expect(img).toBeDefined()
});