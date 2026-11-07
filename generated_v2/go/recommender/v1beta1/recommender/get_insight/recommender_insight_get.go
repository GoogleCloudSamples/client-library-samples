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

// [START recommender_v1beta1_recommender_insight_get]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	recommenderpb "cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
)

// getInsight retrieves an insight using the Recommender API.
func getInsight(ctx context.Context, w io.Writer, projectID string, locationID string, insightTypeID string, insightID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/insightTypes/%s/insights/%s", projectID, locationID, insightTypeID, insightID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.GetInsightRequest{
		Name: name,
	}

	insight, err := client.GetInsight(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInsight failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved insight: %s\n", insight.GetName())
	fmt.Fprintf(w, "Description: %s\n", insight.GetDescription())
	fmt.Fprintf(w, "State: %s\n", insight.GetStateInfo().GetState())

	return nil
}

// [END recommender_v1beta1_recommender_insight_get]
