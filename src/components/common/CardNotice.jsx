import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PostCard = ({ title, postTime, viewCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.postTimeContainer}>
        <Text style={styles.postTime}>{postTime}</Text>
        <View style={styles.viewsContainer}>
          <Icon name="remove-red-eye" size={18} color="#4A4A4A" />
          <Text style={styles.viewCount}>{viewCount}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(!menuOpen)}>
        <Icon name="more-vert" size={24} color="#4A4A4A" />
      </TouchableOpacity>

      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Edit clicked')}>
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.delete]} onPress={() => alert('Delete clicked')}>
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    margin: 10,
    position: 'relative',
    borderLeftWidth: 6,
    borderLeftColor: '#6200ea',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  postTime: {
    fontSize: 14,
    color: 'grey',
    fontStyle:'italic',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCount: {
    fontSize: 14,
    marginLeft: 6,
    color: '#4A4A4A',
  },
  menuButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: 120,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  delete: {
    color: 'red',
  },
});

export default PostCard;
