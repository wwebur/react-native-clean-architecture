import {
  EventListenerCallback,
  EventMapCore,
  NavigationProp,
  PartialState,
  StackNavigationState,
} from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StackNavigationEventMap} from '@react-navigation/stack/lib/typescript/src/types';
import {RootStackParamList} from '../routes';

type Routes = 'Login' | 'SignUp' | 'Home';

export class NavigationStub<P extends Routes>
  implements StackNavigationProp<RootStackParamList, P> {
  action:
    | Readonly<{
        type: string;
        payload?: object;
        source?: string;
        target?: string;
      }>
    | ((
        state: StackNavigationState<RootStackParamList>,
      ) => Readonly<{
        type: string;
        payload?: object;
        source?: string;
        target?: string;
      }>);
  key: string;
  params: string;
  state:
    | StackNavigationState<RootStackParamList>
    | PartialState<StackNavigationState<RootStackParamList>>;
  options: Partial<StackNavigationOptions>;
  eventType: string;
  eventCallback: EventListenerCallback<
    StackNavigationEventMap &
      EventMapCore<StackNavigationState<RootStackParamList>>,
    any
  >;
  count: number;
  name: string;
  dispatch(
    action:
      | Readonly<{
          type: string;
          payload?: object;
          source?: string;
          target?: string;
        }>
      | ((
          state: StackNavigationState<RootStackParamList>,
        ) => Readonly<{
          type: string;
          payload?: object;
          source?: string;
          target?: string;
        }>),
  ): void {
    this.action = action;
  }

  navigate<RouteName extends Routes>(route: {
    name: RouteName;
    key?: string;
    params: RootStackParamList[RouteName];
  }): void {
    this.key = this.key;
    this.name = route.name;
    this.params = route.params;
  }

  reset(
    state:
      | StackNavigationState<RootStackParamList>
      | PartialState<StackNavigationState<RootStackParamList>>,
  ): void {
    this.state = state;
  }

  goBack(): void {
    throw new Error('Method not implemented.');
  }

  isFocused(): boolean {
    throw new Error('Method not implemented.');
  }

  canGoBack(): boolean {
    throw new Error('Method not implemented.');
  }

  dangerouslyGetParent<
    T = NavigationProp<
      Record<string, object>,
      string,
      Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[];
        routes: (Readonly<{key: string; name: string}> &
          Readonly<{params?: object}> & {
            state?: Readonly<any> | PartialState<Readonly<any>>;
          })[];
        type: string;
        stale: false;
      }>,
      {},
      {}
    >
  >(): T {
    throw new Error('Method not implemented.');
  }

  dangerouslyGetState(): StackNavigationState<RootStackParamList> {
    throw new Error('Method not implemented.');
  }
  protected?: {a: RootStackParamList; b: Routes; c: {}} & {
    a: RootStackParamList;
    b: 'Login';
    c: StackNavigationEventMap;
  };

  setParams(params: undefined): void {
    this.params = params;
  }

  setOptions(options: Partial<StackNavigationOptions>): void {
    this.options = options;
  }

  addListener<
    EventName extends
      | 'transitionStart'
      | 'transitionEnd'
      | 'gestureStart'
      | 'gestureEnd'
      | 'gestureCancel'
      | 'focus'
      | 'blur'
      | 'state'
      | 'beforeRemove'
  >(
    type: EventName,
    callback: EventListenerCallback<
      StackNavigationEventMap &
        EventMapCore<StackNavigationState<RootStackParamList>>,
      EventName
    >,
  ): () => void {
    this.eventType = type;
    this.eventCallback = callback;
    return () => {};
  }

  removeListener<
    EventName extends
      | 'transitionStart'
      | 'transitionEnd'
      | 'gestureStart'
      | 'gestureEnd'
      | 'gestureCancel'
      | 'focus'
      | 'blur'
      | 'state'
      | 'beforeRemove'
  >(
    type: EventName,
    callback: EventListenerCallback<
      StackNavigationEventMap &
        EventMapCore<StackNavigationState<RootStackParamList>>,
      EventName
    >,
  ): void {
    this.eventType = type;
    this.eventCallback = callback;
  }

  replace<RouteName extends Routes>(
    ...args: undefined extends RootStackParamList[RouteName]
      ? [RouteName] | [RouteName, RootStackParamList[RouteName]]
      : [RouteName, RootStackParamList[RouteName]]
  ): void {
    this.key = args.keys()[0];
  }
  push<RouteName extends Routes>(
    ...args: undefined extends RootStackParamList[RouteName]
      ? [RouteName] | [RouteName, RootStackParamList[RouteName]]
      : [RouteName, RootStackParamList[RouteName]]
  ): void {
    this.key = args.keys()[0];
  }
  pop(count?: number): void {
    this.count = count;
  }
  popToTop(): void {
    throw new Error('Method not implemented.');
  }
}
