import { StyleSheet } from "react-native";

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#ff841f",
  },

  headingContainer: {
    backgroundColor: "#ff841f",
    paddingTop: 25,
    alignItems: "center",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 25,
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingBottom: 20,
    backgroundColor: "#ff841f",
  },

  listSectionContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#ff991f",
    marginHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 8,
  },
  listSectionContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",

    backgroundColor: "#ff721f",
    marginHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 8,
  },
  divider: { backgroundColor: "white", height: 1, marginBottom: 10 },
  taskContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
