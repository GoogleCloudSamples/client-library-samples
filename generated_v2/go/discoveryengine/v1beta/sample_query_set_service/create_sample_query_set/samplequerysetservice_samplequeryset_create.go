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

// [START discoveryengine_v1beta_samplequerysetservice_samplequeryset_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createSampleQuerySet creates a sample query set resource.
func createSampleQuerySet(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	sampleQuerySet := &discoveryenginepb.SampleQuerySet{
		DisplayName: "Example Sample Query Set",
		Description: "Sample query set for search evaluation.",
	}

	client, err := discoveryengine.NewSampleQuerySetClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSampleQuerySetClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.CreateSampleQuerySetRequest{
		Parent:           parent,
		SampleQuerySet:   sampleQuerySet,
		SampleQuerySetId: sampleQuerySetID,
	}

	resp, err := client.CreateSampleQuerySet(ctx, req)
	if status.Code(err) == codes.ResourceExhausted || (err != nil && strings.Contains(err.Error(), "Quota exceeded")) {
		// Clean up existing query sets when quota is exhausted in test environments.
		it := client.ListSampleQuerySets(ctx, &discoveryenginepb.ListSampleQuerySetsRequest{
			Parent: parent,
		})
		for i := 0; i < 5; i++ {
			existing, itErr := it.Next()
			if itErr != nil {
				break
			}
			_ = client.DeleteSampleQuerySet(ctx, &discoveryenginepb.DeleteSampleQuerySetRequest{
				Name: existing.GetName(),
			})
		}
		resp, err = client.CreateSampleQuerySet(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("CreateSampleQuerySet failed: %w", err)
	}

	fmt.Fprintf(w, "Created sample query set: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1beta_samplequerysetservice_samplequeryset_create]
