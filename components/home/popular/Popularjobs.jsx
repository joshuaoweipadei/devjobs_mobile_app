import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useFetchJobs } from '../../../hooks/useFetchJobs';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';

import { COLORS, SIZES } from '../../../constants';
import styles from './popularjobs.style';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';

const Popularjobs = () => {
  const router = useRouter();
  const { isLoading, isSuccess, data, isError, refetch, isRefetching } = useFetchJobs("search", {
    query: 'PHP developer',
    num_pages: '1'
  }, "popular-jobs");
  useRefreshOnFocus(refetch);

  const [selectedJob, setSelectedJob] = useState();
  
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          {isRefetching ? (
            <ActivityIndicator size={"small"} color={COLORS.primary} />
          ) : (
            <Text style={styles.headerBtn}>Show all</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : isError ? (
          <Text style={{ marginBottom: 15, color: COLORS.gray2 }}>You have exceeded the MONTHLY quota for Requests on your current plan.</Text>
        ) : (
          <>
            {isSuccess && data && data.length > 0 ? (
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <PopularJobCard 
                    item={item}
                    selectedJob={selectedJob}
                    onPress={handleCardPress}
                  />
                )}
                keyExtractor={(item) => item?.job_id}
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
              />
            ) : (
              <Text>No records found</Text>
            )}
          </>
        )}
      </View>
    </View>
  )
}

export default Popularjobs