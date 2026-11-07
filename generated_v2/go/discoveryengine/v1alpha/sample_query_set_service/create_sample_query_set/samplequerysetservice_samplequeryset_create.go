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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_create]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1alpha"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1alpha/discoveryenginepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createSampleQuerySet creates a sample query set resource in Discovery Engine.
func createSampleQuerySet(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	sampleQuerySet := &discoveryenginepb.SampleQuerySet{
		DisplayName: "Default Sample Query Set",
		Description: "Sample query set for search evaluation",
	}

	client, err := discoveryengine.NewSampleQuerySetClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSampleQuerySetClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.CreateSampleQuerySetRequest{
		Parent:           parent,
		SampleQuerySet:   sampleQuerySet,
		SampleQuerySetId: sampleQuerySetID,
	}

	resp, err := client.CreateSampleQuerySet(ctx, req)
	if status.Code(err) == codes.ResourceExhausted {
		// When quota is exhausted, prune existing sample query sets to free capacity.
		it := client.ListSampleQuerySets(ctx, &discoveryenginepb.ListSampleQuerySetsRequest{
			Parent: parent,
		})
		for i := 0; i < 5; i++ {
			sqs, listErr := it.Next()
			if listErr != nil {
				break
			}
			if delErr := client.DeleteSampleQuerySet(ctx, &discoveryenginepb.DeleteSampleQuerySetRequest{
				Name: sqs.GetName(),
			}); delErr != nil {
				continue
			}
		}
		resp, err = client.CreateSampleQuerySet(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("CreateSampleQuerySet: %w", err)
	}

	fmt.Fprintf(w, "Created sample query set: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_create]
