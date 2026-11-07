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

// [START recommender_v1beta1_recommender_recommendation_get]

import (
	"context"
	"fmt"
	"io"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	"cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
)

// getRecommendation retrieves a specific recommendation by its resource name.
func getRecommendation(ctx context.Context, w io.Writer, projectID string, locationID string, recommenderID string, recommendationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s/recommendations/%s", projectID, locationID, recommenderID, recommendationID)

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.GetRecommendationRequest{
		Name: name,
	}

	resp, err := client.GetRecommendation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetRecommendation: %w", err)
	}

	fmt.Fprintf(w, "Recommendation: %s\n", resp.GetName())
	fmt.Fprintf(w, "Description: %s\n", resp.GetDescription())

	return nil
}

// [END recommender_v1beta1_recommender_recommendation_get]
