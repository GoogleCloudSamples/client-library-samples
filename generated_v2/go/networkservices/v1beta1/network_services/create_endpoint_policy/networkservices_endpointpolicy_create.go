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

// [START networkservices_v1beta1_networkservices_endpointpolicy_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1beta1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1beta1/networkservicespb"
)

// createEndpointPolicy creates an EndpointPolicy in Google Cloud Network Services.
func createEndpointPolicy(ctx context.Context, w io.Writer, projectID string, endpointPolicyID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	metadataLabels := []*networkservicespb.EndpointMatcher_MetadataLabelMatcher_MetadataLabels{
		{
			LabelName:  "env",
			LabelValue: "prod",
		},
	}

	metadataMatcher := &networkservicespb.EndpointMatcher_MetadataLabelMatcher{
		MetadataLabelMatchCriteria: networkservicespb.EndpointMatcher_MetadataLabelMatcher_MATCH_ANY,
		MetadataLabels:             metadataLabels,
	}

	endpointMatcher := &networkservicespb.EndpointMatcher{
		MatcherType: &networkservicespb.EndpointMatcher_MetadataLabelMatcher_{
			MetadataLabelMatcher: metadataMatcher,
		},
	}

	endpointPolicy := &networkservicespb.EndpointPolicy{
		Type:            networkservicespb.EndpointPolicy_SIDECAR_PROXY,
		Description:     "Example Endpoint Policy",
		EndpointMatcher: endpointMatcher,
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.CreateEndpointPolicyRequest{
		Parent:           parent,
		EndpointPolicyId: endpointPolicyID,
		EndpointPolicy:   endpointPolicy,
	}

	op, err := client.CreateEndpointPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEndpointPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created EndpointPolicy: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1beta1_networkservices_endpointpolicy_create]
