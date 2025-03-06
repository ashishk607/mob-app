import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#F97794",
    padding: 10,
    borderRadius: 5,
  },
  okText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CustomAlert;
