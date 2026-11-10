// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START firestore_v1_firestore_run_aggregation_query]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
)

// runAggregationQuery runs an aggregation query against a Firestore collection.
func runAggregationQuery(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	parent := fmt.Sprintf("projects/%s/databases/%s/documents", projectID, databaseID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	query := &firestorepb.StructuredQuery{
		From: []*firestorepb.StructuredQuery_CollectionSelector{
			{CollectionId: "users"},
		},
	}

	countAggregation := &firestorepb.StructuredAggregationQuery_Aggregation{
		Operator: &firestorepb.StructuredAggregationQuery_Aggregation_Count_{
			Count: &firestorepb.StructuredAggregationQuery_Aggregation_Count{},
		},
		Alias: "total_count",
	}

	aggregationQuery := &firestorepb.StructuredAggregationQuery{
		QueryType: &firestorepb.StructuredAggregationQuery_StructuredQuery{
			StructuredQuery: query,
		},
		Aggregations: []*firestorepb.StructuredAggregationQuery_Aggregation{
			countAggregation,
		},
	}

	req := &firestorepb.RunAggregationQueryRequest{
		Parent: parent,
		QueryType: &firestorepb.RunAggregationQueryRequest_StructuredAggregationQuery{
			StructuredAggregationQuery: aggregationQuery,
		},
	}

	stream, err := client.RunAggregationQuery(ctx, req)
	if err != nil {
		return fmt.Errorf("RunAggregationQuery failed: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("Recv failed: %w", err)
		}

		for alias, val := range resp.GetResult().GetAggregateFields() {
			fmt.Fprintf(w, "%s: %d\n", alias, val.GetIntegerValue())
		}
	}

	return nil
}

// [END firestore_v1_firestore_run_aggregation_query]
