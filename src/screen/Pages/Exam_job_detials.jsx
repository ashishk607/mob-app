import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { JobData } from '../IndexFiles/Jobsdetails';

const JobDetailsLayout = ({ jobData = JobData, Exam_name }) => {
    const {
      title = 'N/A',
      summary = 'No summary available.',
      importantDates = [],
      applicationFee = [],
      ageLimit = {},
      vacancies = [],
      eligibility = [],
      categoryWiseVacancies = [],
      howToApply = [],
    } = jobData?.[Exam_name] ?? {};
    console.log(Exam_name)
  

  const renderTable = (headers, rows) => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.tableHeader}>{header}</Text>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          {row.map((cell, cellIndex) => (
            <Text key={cellIndex} style={styles.tableCell}>{cell}</Text>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Text>{summary}</Text>
      </Card>

      <Card>
        <Card.Title>Important Dates</Card.Title>
        {renderTable(['Label', 'Date'], importantDates.map(date => [date?.label ?? 'N/A', date?.value ?? 'N/A']))}
      </Card>

      <Card>
        <Card.Title>Application Fee</Card.Title>
        {renderTable(['Category', 'Amount'], applicationFee.map(fee => [fee?.category ?? 'N/A', fee?.amount ?? 'N/A']))}
      </Card>

      <Card>
        <Card.Title>Age Limit</Card.Title>
        {renderTable(['Minimum Age', 'Maximum Age', 'Relaxation'], [[ageLimit?.min ?? 'N/A', ageLimit?.max ?? 'N/A', ageLimit?.relaxation ?? 'N/A']])}
      </Card>

      <Card>
        <Card.Title>Vacancies</Card.Title>
        {renderTable(['Post', 'Total'], vacancies.map(vacancy => [vacancy?.post ?? 'N/A', vacancy?.total ?? 'N/A']))}
      </Card>

      <Card>
        <Card.Title>Eligibility Criteria</Card.Title>
        {renderTable(['Post', 'Qualification'], eligibility.map(criteria => [criteria?.post ?? 'N/A', criteria?.qualification ?? 'N/A']))}
      </Card>

      <Card>
        <Card.Title>Category-wise Vacancies</Card.Title>
        {categoryWiseVacancies.map((post, index) => (
          <View key={index}>
            <Text style={styles.tableHeader}>{post?.post ?? 'N/A'}</Text>
            {renderTable(['Category', 'Count'], post?.categories.map(cat => [cat?.name ?? 'N/A', cat?.count ?? 'N/A']))}
          </View>
        ))}
      </Card>

      <Card>
        <Card.Title>Document Required</Card.Title>
        {renderTable(['Step'], howToApply.map(step => [step ?? 'N/A']))}
      </Card>
      {/* <Text style={styles.applyText}>To Apply</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
 
});

export default JobDetailsLayout;
