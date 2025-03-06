import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
  Home: {
      userId: string,
      balance: number
  }
  Dashboard: {
      userId: string,
      balance: number
  };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, "Dashboard">;