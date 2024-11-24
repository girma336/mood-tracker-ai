import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import axios from "axios"; // Import axios

export default function MoodTrackerApp() {
  const [moodScale, setMoodScale] = useState<number>(3); // Default mood scale is 3
  const [description, setDescription] = useState<string>(""); // Mood description
  const [aiInsight, setAiInsight] = useState<string>(""); // AI-generated insight
  const [history, setHistory] = useState<
    { mood: number; description: string; insight: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Handle form submission
  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description for your mood!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mood-tracker",
        {
          moodScale,
          description,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const newEntry = {
          mood: moodScale,
          description,
          insight: data.insight,
        };
        setHistory([newEntry, ...history]);
        setAiInsight(data.insight);
        setDescription(""); // Clear input field
      } else {
        Alert.alert("Error", response.data.error || "Failed to get insights.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Mood Scale */}
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={moodScale}
        onValueChange={(value: number) => setMoodScale(value)}
      />
      <Text style={styles.moodValue}>Mood: {moodScale}</Text>

      {/* Mood Description */}
      <Text style={styles.label}>Describe your mood:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Feeling stressed about work"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* AI Insight */}
      {aiInsight && (
        <View style={styles.result}>
          <Text style={styles.insightTitle}>AI Insight:</Text>
          <Text style={styles.insightText}>{aiInsight}</Text>
        </View>
      )}

      {/* Mood History */}
      <Text style={styles.historyTitle}>Mood History:</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>
              Mood: {item.mood} - {item.description}
            </Text>
            <Text style={styles.historyText}>Insight: {item.insight}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 16,
  },
  slider: {
    marginVertical: 8,
  },
  moodValue: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginTop: 8,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  insightText: {
    fontSize: 16,
    color: "#333",
  },
  historyTitle: {
    fontSize: 20,
    marginTop: 24,
    fontWeight: "bold",
  },
  historyItem: {
    marginTop: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  historyText: {
    fontSize: 14,
  },
});
