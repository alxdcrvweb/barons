import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import { StakeModal } from "./Stake";

import { ReferralModal } from "./Referral";
import { SettingsModal } from "./Settings";
import { CraftModal } from "./Craft";
import { UpgradeModal } from "./Upgrade";
import { RepairModal } from "./Repair";
import { ClaimModal } from "./Claim";
import { StakeCraftModal } from "./StakeCraft";
import { ResettleModal } from "./Resettle";
import { TroopsInfoModal } from "./TroopsInfoModal";
import { CritModal } from "./Crit";
import { MineInfoModal } from "./MineInfoModal";
import { AmuletInfoModal } from "./AmuletInfoModal";
import { WithdrawModal } from "./Withdraw";
import { OpenPackModal } from "./OpenPack";
import { OpenResultModal } from "./OpenResult";
import { CraftPackModal } from "./CraftPack";
export enum ModalsEnum {
  Resettle,
  Stake,
  Referral,
  Settings,
  Craft,
  Upgrade,
  Repair,
  Claim,
  StakeCraft,
  TroopsInfo,
  MineInfo,
  AmuletInfo,
  Crit,
  Withdraw,
  OpenPack,
  OpenResult,
  CraftPack
}

const MODAL_REGISTRY = {
  [ModalsEnum.Stake]: StakeModal,
  [ModalsEnum.StakeCraft]: StakeCraftModal,
  [ModalsEnum.Referral]: ReferralModal,
  [ModalsEnum.Settings]: SettingsModal,
  [ModalsEnum.Craft]: CraftModal,
  [ModalsEnum.Upgrade]: UpgradeModal,
  [ModalsEnum.Repair]: RepairModal,
  [ModalsEnum.Claim]: ClaimModal,
  [ModalsEnum.Resettle]: ResettleModal,
  [ModalsEnum.Crit]: CritModal,
  [ModalsEnum.TroopsInfo]: TroopsInfoModal,
  [ModalsEnum.MineInfo]: MineInfoModal,
  [ModalsEnum.AmuletInfo]: AmuletInfoModal,
  [ModalsEnum.Withdraw]: WithdrawModal,
  [ModalsEnum.OpenPack]: OpenPackModal,
  [ModalsEnum.OpenResult]: OpenResultModal,
  [ModalsEnum.CraftPack]: CraftPackModal,
};

export const ModalsContainer = observer(() => {
  const modalStore = useInjection(ModalStore);

  return (
    <>
      {modalStore.activeModals.map((m, i) => {
        const Component = MODAL_REGISTRY[m.key];
        return <Component key={i} data={m.data} idx={i} />;
      })}
    </>
  );
});
