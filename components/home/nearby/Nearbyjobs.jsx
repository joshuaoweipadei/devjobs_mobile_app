import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import { useFetchJobs } from '../../../hooks/useFetchJobs';
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus';

import { COLORS } from '../../../constants';
import styles from './nearbyjobs.style'

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

const Nearbyjobs = () => {
  const router = useRouter();
  const { isLoading, isSuccess, data, isError, refetch, isRefetching } = useFetchJobs("search", {
    query: 'React Native developer',
    num_pages: '1'
  }, "nearby-jobs");
  useRefreshOnFocus(refetch);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
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
              <>
              {data.map((job) => (
                <NearbyJobCard
                  job={job}
                  key={job?.job_id}
                  handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                />
              ))}
              </>
            ) : (
              <Text>No records found</Text>
            )}
          </>
        )}
         {isRefetching ? (
          <View style={{ paddingVertical: 10, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 14 }}>Loading more...</Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default Nearbyjobs