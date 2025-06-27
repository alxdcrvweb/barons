import { Container } from 'inversify'
import { UserStore } from './UserStore'
import { ModalStore } from './ModalStore'
import { useMemo } from 'react'
import WalletStore from "./WalletStore";
import { CardStore } from './CardStore';
import { CraftStore } from './CraftStore';
import { LandsStore } from './LandsStore';
import { WarehouseStore } from './WarehouseStore';

export class RootStore {
    public userStore: UserStore
    public container: Container
    public modalStore: ModalStore
    public cardStore: CardStore
    public walletStore: WalletStore;
    public craftStore: CraftStore;
    public landsStore: LandsStore;
    public warehouseStore: WarehouseStore;
    public constructor() {
        this.userStore = new UserStore(this)
        this.modalStore = new ModalStore(this)
        this.walletStore = new WalletStore(this);
        this.cardStore = new CardStore(this);
        this.craftStore = new CraftStore(this);
        this.landsStore = new LandsStore(this);
        this.warehouseStore = new WarehouseStore(this);
        this.container = new Container()
        this.container.bind(UserStore).toConstantValue(this.userStore)
        this.container.bind(ModalStore).toConstantValue(this.modalStore)
        this.container.bind(WalletStore).toConstantValue(this.walletStore);
        this.container.bind(CardStore).toConstantValue(this.cardStore);
        this.container.bind(CraftStore).toConstantValue(this.craftStore);
        this.container.bind(Container).toConstantValue(this.container)
        this.container.bind(LandsStore).toConstantValue(this.landsStore)
        this.container.bind(WarehouseStore).toConstantValue(this.warehouseStore)
    }
}

function initializeStore(initialData: unknown = null) {
    let store
    const _store = store ?? new RootStore()
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
    return _store
}

export function useStore(initialState?: unknown) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
