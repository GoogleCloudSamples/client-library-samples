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

// [START recommender_v1_recommender_mark_recommendation_claimed]

import (
	"context"
	"fmt"
	"io"
	"strings"

	recommender "cloud.google.com/go/recommender/apiv1beta1"
	"cloud.google.com/go/recommender/apiv1beta1/recommenderpb"
)

// markRecommendationClaimed marks a recommendation as claimed with state metadata.
func markRecommendationClaimed(ctx context.Context, w io.Writer, projectID string, locationID string, recommenderID string, recommendationID string, etag string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/recommenders/%s/recommendations/%s", projectID, locationID, recommenderID, recommendationID)
	stateMetadata := map[string]string{
		"claimed-by": "example-user",
	}

	if etag != "" {
		etag = fmt.Sprintf("\"%s\"", strings.Trim(strings.TrimSpace(etag), "\""))
	}

	client, err := recommender.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recommender.NewClient: %w", err)
	}
	defer client.Close()

	req := &recommenderpb.MarkRecommendationClaimedRequest{
		Name:          name,
		StateMetadata: stateMetadata,
		Etag:          etag,
	}

	resp, err := client.MarkRecommendationClaimed(ctx, req)
	if err != nil {
		return fmt.Errorf("client.MarkRecommendationClaimed: %w", err)
	}

	fmt.Fprintf(w, "Marked recommendation claimed: %s\n", resp.GetName())
	fmt.Fprintf(w, "State: %s\n", resp.GetStateInfo().GetState())

	return nil
}

// [END recommender_v1_recommender_mark_recommendation_claimed]
