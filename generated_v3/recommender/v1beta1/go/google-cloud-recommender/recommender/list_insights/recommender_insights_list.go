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

// [START recommender_v1beta1_recommender_insights_list]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	recommenderpb "cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
	"google.golang.org/api/iterator"
)

// listInsights lists evaluation insights for a given project, location, and insight type.
func listInsights(ctx context.Context, w io.Writer, locationID string, insightTypeID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/insightTypes/%s", projectID, locationID, insightTypeID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recommender.NewClient: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.ListInsightsRequest{
		Parent: parent,
	}

	it := client.ListInsights(ctx, req)
	for {
		insight, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListInsights: %w", err)
		}
		fmt.Fprintf(w, "Insight: %s\n", insight.GetName())
	}

	return nil
}

// [END recommender_v1beta1_recommender_insights_list]
