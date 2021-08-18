import type { ParamListBase } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
} from "@react-navigation/stack";
import * as React from "react";
import { Platform, ScrollView, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Albums from "../Shared/Albums";
import Article from "../Shared/Article";
import NewsFeed from "../Shared/NewsFeed";

export type SimpleStackParams = {
  Article: { author: string } | undefined;
  NewsFeed: { date: number };
  Albums: undefined;
};

const scrollEnabled = Platform.select({ web: true, default: false });

const ArticleScreen = ({
  navigation,
  route,
}: StackScreenProps<SimpleStackParams, "Article">) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ["50%", "90%"], []);

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "grey" }}>
      <Article
        author={{ name: route.params?.author ?? "Unknown" }}
        scrollEnabled={scrollEnabled}
      />
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            pellentesque massa ut faucibus ultricies. In vulputate orci sit amet
            dolor cursus, vitae convallis nisi suscipit. Integer at purus eu
            eros malesuada facilisis. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia curae; In at libero sed sem
            ullamcorper bibendum vel ac neque. Curabitur sodales urna nisi, in
            lacinia nisl pretium et. Nulla quis nunc nec augue mattis sodales ac
            accumsan orci. Nullam vel nulla sem. Phasellus ultrices diam sed
            elit elementum hendrerit. Donec molestie tempus purus quis
            fringilla. Phasellus interdum elit in urna ultricies sollicitudin.
            Mauris fringilla turpis eget ex venenatis suscipit. Ut at ipsum eu
            urna fringilla elementum ut at massa. Cras blandit diam quis
            vehicula accumsan. In non lobortis neque, eget volutpat elit. Ut id
            erat velit. Phasellus gravida venenatis metus a mattis. Sed luctus,
            erat a pellentesque ultrices, erat tortor semper erat, eget
            pellentesque ante sapien vitae enim. Orci varius natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. Aenean
            semper sapien et mi ultricies, sit amet lobortis eros feugiat. Duis
            eu quam sit amet ligula luctus ornare. Vivamus lobortis lacus varius
            diam pretium dictum. Sed vel ligula in massa sollicitudin blandit.
            Donec id tellus augue. Curabitur sit amet massa vitae nisi luctus
            scelerisque quis sit amet tellus. Fusce auctor lobortis ligula, sed
            lobortis nisl varius ac. Mauris et lectus mollis, dapibus est ut,
            laoreet massa. Morbi nec lorem magna. Pellentesque iaculis, turpis
            at sagittis sollicitudin, dolor metus hendrerit dolor, ut eleifend
            diam nunc nec magna. Praesent eget tincidunt mauris. Nullam
            hendrerit, erat at accumsan imperdiet, mauris metus tincidunt velit,
            at laoreet nunc quam vitae felis. Sed gravida libero a sapien
            maximus rutrum. Mauris suscipit eu felis vel iaculis. Nulla
            facilisi. Pellentesque eget tincidunt turpis. Pellentesque eget
            justo non neque mollis maximus. Duis iaculis congue massa a finibus.
            Nulla eu pretium tellus. Cras elit ipsum, malesuada sit amet sapien
            vitae, sollicitudin posuere leo. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Morbi at ligula ut magna porta scelerisque. Ut non sapien sit amet
            risus facilisis finibus non sed est. In vitae nunc est. In fringilla
            ut nunc ac lacinia. Duis ligula ante, aliquam id hendrerit sed,
            fermentum ac metus. Suspendisse at urna vel nunc pulvinar eleifend.
            Proin quis fermentum felis. Nulla a pellentesque nisl. Etiam
            vehicula tellus in dictum dapibus. Sed gravida metus ligula, sed
            sollicitudin diam condimentum id. Curabitur ut ornare sem. Mauris
            consectetur tempus mollis. Nullam ut purus tellus. Aliquam id orci a
            neque dictum volutpat sit amet nec diam. Nullam orci metus, rutrum
            ut mollis eu, dignissim malesuada nisi. Quisque ullamcorper turpis
            risus, at euismod metus iaculis pellentesque. Morbi malesuada mollis
            risus, at tempor lacus mattis non. Integer venenatis augue sed
            venenatis pharetra. Duis egestas diam libero, eget interdum urna
            bibendum id. Phasellus hendrerit tempus arcu, in vulputate sem.
          </Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const NewsFeedScreen = ({
  route,
  navigation,
}: StackScreenProps<SimpleStackParams, "NewsFeed">) => {
  return (
    <ScrollView>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Albums")}
          style={styles.button}
        >
          Navigate to album
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Go back
        </Button>
      </View>
      <NewsFeed scrollEnabled={scrollEnabled} date={route.params.date} />
    </ScrollView>
  );
};

const AlbumsScreen = ({
  navigation,
}: StackScreenProps<SimpleStackParams, "Albums">) => {
  return (
    <ScrollView>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => navigation.push("Article", { author: "Babel fish" })}
          style={styles.button}
        >
          Push article
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.pop(2)}
          style={styles.button}
        >
          Pop by 2
        </Button>
      </View>
      <Albums scrollEnabled={scrollEnabled} />
    </ScrollView>
  );
};

const SimpleStack = createStackNavigator<SimpleStackParams>();

export default function SimpleStackScreen({
  navigation,
  screenOptions,
}: StackScreenProps<ParamListBase> & {
  screenOptions?: StackNavigationOptions;
}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SimpleStack.Navigator screenOptions={screenOptions}>
      <SimpleStack.Screen
        name="Article"
        component={ArticleScreen}
        options={({ route }) => ({
          title: `Article by ${route.params?.author ?? "Unknown"}`,
        })}
        initialParams={{ author: "Gandalf" }}
      />
      <SimpleStack.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{ title: "Feed" }}
      />
      <SimpleStack.Screen
        name="Albums"
        component={AlbumsScreen}
        options={{ title: "Albums" }}
      />
    </SimpleStack.Navigator>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    padding: 8,
  },
  button: {
    margin: 8,
  },
});
